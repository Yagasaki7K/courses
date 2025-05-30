package main

import (
	"html/template"
	"net/http"
)

type Task struct {
	Title string
	Done  bool
}

var tasks = []Task{
	{Title: "Aprender Go", Done: false},
	{Title: "Criar um servidor web", Done: true},
}

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.HandleFunc("/", HomeHandler)
	http.ListenAndServe(":8080", nil)
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("templates/index.html"))
	tmpl.Execute(w, tasks)
}
