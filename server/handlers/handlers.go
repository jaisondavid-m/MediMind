package handlers

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	genai "github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

func AskQuestions(c *gin.Context) {

	_ = godotenv.Load()

	var body struct {
		Report string `json:"report"`
		City   string `json:"city"`
	}

	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON body"})
		return
	}

	if body.Report == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Report is required"})
		return
	}

	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Missing GEMINI_API_KEY in environment"})
		return
	}

	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create AI client"})
		return
	}

	model := client.GenerativeModel("gemini-2.5-flash")

	// Force JSON output
	model.ResponseMIMEType = "application/json"
	model.ResponseSchema = &genai.Schema{
		Type: genai.TypeObject,
		Properties: map[string]*genai.Schema{
			"deficiencies":   {Type: genai.TypeArray, Items: &genai.Schema{Type: genai.TypeString}},
			"lifestyle_tips": {Type: genai.TypeArray, Items: &genai.Schema{Type: genai.TypeString}},
			"doctor_advice":  {Type: genai.TypeString},
			"hospitals":      {Type: genai.TypeArray, Items: &genai.Schema{Type: genai.TypeString}},
		},
	}

	// FINAL PROMPT
	prompt := fmt.Sprintf(`
			You are a Medical Report Assistance Agent.
			You DO NOT provide medical diagnoses.
			You only:
			1. Identify POSSIBLE deficiencies based on the medical report.
			2. Suggest SIMPLE lifestyle improvements.
			3. Recommend when the user SHOULD see a doctor.
			4. Recommend 3 hospitals in the user's city: %s.

			Rules:
			- Strictly respond ONLY to medical reports.
			- If the input is NOT a medical report → respond with:
			{"message": "I am only programmed for medical purposes"}
			- Output STRICT JSON only.
			- If the medical report is unclear or incomplete → return:
			{"error": "insufficient data"}

			USER REPORT:
			%s
			`, body.City, body.Report)


	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "AI model request failed"})
		return
	}

	if resp == nil || len(resp.Candidates) == 0 ||
		resp.Candidates[0].Content == nil ||
		len(resp.Candidates[0].Content.Parts) == 0 {

		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid or empty AI response"})
		return
	}

	part := resp.Candidates[0].Content.Parts[0]

	// Extract JSON text safely
	text, ok := part.(genai.Text)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "AI returned unexpected content format"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"analysis": string(text),
	})
}
