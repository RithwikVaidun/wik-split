#include <stdio.h>
#include <stdlib.h>
#include "names.h"

int main(void)
{
    int num_players = 2;
    printf("Number of players (2 to 10)? ");
    int scanf_result = scanf("%d", &num_players);
    typedef enum
    {
        SIDE,
        RAZORBACK,
        TROTTER,
        SNOUTER,
        JOWLER
    } Position;
    const Position pig[7] = {
        SIDE,
        SIDE,
        RAZORBACK,
        TROTTER,
        SNOUTER,
        JOWLER,
        JOWLER,
    };

    if (scanf_result < 1 || num_players < 2 || num_players > 10)
    {
        fprintf(stderr, "Invalid number of players. Using 2 instead.\n");
    }

    unsigned seed = 2023;
    printf("Random-number seed? ");
    scanf_result = scanf("%u", &seed);

    if (scanf_result < 1)
    {
        fprintf(stderr, "Invalid seed. Using 2023 instead.\n");
    }

    int gameOver = 0;
    srandom(seed);

    int scores[num_players];
    for (int i = 0; i < num_players; i++)
    {
        scores[i] = 0;
    }

    int currentPlayer = 0;

    while (!gameOver)
    {
        char name[] = player_name[playerInd] printf("%s\n", name);

        int playerRolling = 1;
        int playerScore = 0

            while (playerRolling)
        {
            int roll = random() % 7;
            Position action = (Position)roll;
            int actionScore = 0;

            switch (action)
            {
            case SIDE:
                printf("Player %s rolls %d, has %d\n", name, roll, playerScore);
                break;
            case RAZORBACK:
                actionScore = 10;
                break;
            case TROTTER:
                actionScore = 10;
                break;
            case SNOUTER:
                actionScore = 15;
                break;
            case JOWLER:
                actionScore = 5;
                break;
            default:
                break;
            };

            playerScore += actionScore;
            scores[currentPlayer] += actionScore;

            if (action == SIDE)
            {
                break;
            }
            printf("Player %d rolls %d, has %d\n", currentPlayer + 1, roll, playerScore);

            if (scores[currentPlayer] >= 100)
            {
                winPlayer = currentPlayer;
                break;
            }

            currentPlayer = (currentPlayer + 1) % numPlayers;
        }
    }
}