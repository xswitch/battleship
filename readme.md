TODO

# Simple AI
> Shoot close to same coordinates if it was a hit -> change target if last shot sunk a ship
>> If hit, record on player
>>> getValidCoordinates() should check if lastShot !== undefined, if so return an adjacent tile if possible
>>> lastShot should record coordinates -> check all directions for valid -> if nothing is valid, do normal shot
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
