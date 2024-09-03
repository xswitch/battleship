TODO

# Code the game loop
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
> When switching ships, ships can be placed as if they had previous length
>> If x is lower and xMax is higher it happens. need check for those
create coordinates from difference, then run checkforship on all coordinates