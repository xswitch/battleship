TODO

# Code the game loop
> PRE GAME
>> Player 1 places ships first
>>> When all ships are placed change currentPlayer to player 2
>>>> When all player2's ships are placed change currentPlayer to player1 and state to playing

> Player 1 starts
>> Click cell on player 2 board
>>> Check if hit/miss/used
>>>> if used, display error and go again else record result and send hit()
>>>>> Check if all ships are sunken if not, change player and start from step 1
# Simple AI
> Done
>> Shoot close to same coordinates if it was a hit
# Placing of ships
> store type of ships and amount on player objects
>> Either select ship to place or just go through them all in order
>>> preview of placement
>>>> Ability to rotate ship
>>>>> Drag&Drop and sprites
# Polish site
> Start screen
> Options
> Icons
> End Screen

Bugs


DOING NOW
> Creating checks for amount of ships left
> Changing ship to next in array if amount === 0
> Start on first ship in array, remove buttons for selecting
> Show amount left and preview placement
> Start normal game loop when both players have placed ships