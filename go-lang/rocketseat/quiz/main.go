package main

import (
	"bufio"
	"encoding/csv"
	"fmt"
	"os"
	"strconv"
)

type Question struct {
	Text    string
	Options []string
	Answer  int
}

type GameState struct {
	Name      string
	Points    string
	Questions Question
}

func (g *GameState) Init() {
	fmt.Println("Seja bem vindo(a) ao quiz")
	fmt.Println("Escreva o seu nome:")

	reader := bufio.NewReader(os.Stdin)

	name, err, := reader.ReadString("\n")

	if err != nil {
	    panic("Erro ao ler o input do usuário")
	}

	g.Name := name

	fmt.Printf("Vamos ao jogo %s", g.Name)
}

func (g *GameState) ProcessCSV(){
    file, err := os.Open("quiz-go.csv")
    
    if err != nil {
        panic("Erro ao ler arquivo ou arquivo não encontrado")
    }
    
    defer file.Close()
    
    reader := csv.NewReader(file)
    records, err := reader.ReadAll()
    
    if err != nil {
        panic("Error ao ler o documento .csv")
    }
    
    for index, record := range records {
        fmt.Println(index, record)
        if index > 0 {
            question := Question { 
                Text: record[0],
                Options: record[1:5],
                Answer: toInt(record[5]),
            }
            
            g.Questions = append(g.Questions, question)
        }
    }
}

func (g *GameState) Run() {
    for index, question := range g.Questions {
        fmt.Printf("\033[35m %d %s \033[35m\n", index+1, question.Text)
    }
}

func main() {
	game := &GameState{}
	go game.ProcessCSV()
	game.Init()
	game.Run()
}

func toInt(number string) int {
    index, err := strconv.Atoi(number)
    if err != nil {
        panic(err)
    }
    return index
}