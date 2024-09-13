TODO

# Simple AI
> change target if last shot sunk a ship
> If no adjacent shots are valid, do normal shot (validShots.length === 0 || shipsLastShot > ships.length)
# Polish site
> Icons
> Toasts - Notifications for errors, hits, misses and whatever
> Info under boards with remaining ships
> Get player info from home when starting game
> 

Bugs
> Active board stays on player 1 when placing ships. 2player mode

DOING NOW

> Start screen
>> Options
>>> Choose amount of ships, names and length
>>> To play vs AI or Human

> End screen scoreboard

> Split up functions, isolating functionality
>> placeShip - check if ship is already there
>> Clean up gameboard class. Move stuff over to player class

> Get images for ships
>> Split up image into as many parts as ships length
>>> Assign each part to each cell in turn
>>> When rotating ship, rotate images as well
