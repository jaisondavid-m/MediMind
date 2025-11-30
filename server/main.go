package main

import (
	"library/handlers"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000","https://medi-mind-hk1m-pejmwl0q7-jaison-ms-projects.vercel.app/"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	r.POST("/ask", handlers.AskQuestions)
	err := r.Run(":8000")
	if err != nil {
		log.Fatal("Failed to start server:", err)
	}
}