# Skynet Beta Functional Specification

### Accounts and authentication
- AA001 - Users can sign up with username and password. There is visual feedback for doing so. 
- AA002 - Inputted passwords are hidden by default, but can be revealed to the user with a ‘show’ button
- AA003 - Users cannot sign up with invalid email. Emails must:
	- have a valid format
	- not exceed 255 characters
	- not have a local part of their email longer than 64 characters
- AA004 - Users cannot sign up with a password that: 
	- is shorter than 8 characters,
	- longer than 20 characters,
	- does not include a number,
	- does not include a special character,
	- does not include a mix of uppercase and lowercase letters
- AA005 - Signed up users can log in if they provide the correct credentials
- AA006 - There is clear visual feedback if the user inputs invalid registration/login details
- AA007 - Logged in users can log out
- AA008 - Users can delete their account
- AA009 - Users can easily navigate between sign up and log in screens

### Robot Creation and Display
- RB001 - Users cannot create a robot without being signed up and logged in
- RB002 - Users must name their robot in the robot creation screen. There is a maximum robot name length
- RB003 - Users must choose one personality for their robot. The default is ‘helpful’, but they can also choose ‘playful’, ‘wise’ or ‘fiery’
- RB004 - Users can add to a list of up to 5 ‘likes’ and ‘dislikes’ for their robot. These impact the robot’s personality. Likes/dislikes are written by the user themself, and they have a maximum length
- RB005 - After creating a robot, users can see their robot and its attributes on the home screen
- RB006 - If a user logs in and they have not created a robot yet, they will be prompted to create one. Otherwise, they will be guided to the home screen, where they can see their robot and its attributes
- RB007- The following attributes are visible on the home screen:
	- Name
	- Battery
	- Memory
	- Intelligence
	- Hardware
	- Mood
	- Currency

### Robot Attributes
- RA001 - Battery starts at 100% and can only be 0-100%
- RA002 - Battery depletes by 5% for every 30 minutes of in-game usage
- RA003 - Robot dies if battery reaches 0%
- RA004 - Memory starts at 16GB and can only be 16-4096GB
- RA005 - Intelligence starts at 0 and can only be 0-4096
- RA006 - Intelligence can never be higher than memory
- RA007 - Hardware starts at 100% and can only be 0-100%
- RA008 - Robot dies if hardware reaches 0%
- RA009 - Robot mood starts at ‘Happy’ but can also be ‘Neutral’ or ‘Sad’
- RA010 - Robot mood changes based on battery and hardware attributes:
	- The robot's mood is set to 'Sad' if either battery or hardware is 30 or lower.
	- The robot's mood is 'Neutral' if both battery and hardware are between 31 and 69.
	- The robot's mood is 'Happy' if: both hardware and battery are above 70, or if one attribute (either battery or hardware) is at least 70, and the other attribute is at least 31.
- RA011 - Hardware will randomly deplete by either 2, 5 or 15 upon logging in
- RA012 - Battery will randomly deplete by either 2, 5 or - 10 upon logging in
- RA013 - Currency starts at 500 for a newly-created robot. There is no maximum amount of currency
- RA014 - The user will gain 100 currency for the first login of every calendar day

### Upgrades and Actions
- UP001 - Users can charge their robot, either by 10% or up to full charge. Each 1% of battery charged costs 1 currency
- UP002 - Users can upgrade their robot’s hardware in 50% increments. This will cost 50 currency per upgrade
- UP003 - Users can double their robot’s memory by spending 200 currency
- UP004 - Users can try to teach their robot by spending 30 currency. This will give them a 90% chance of increasing their robot’s intelligence by 5
- UP005 - Users can press the ‘speak’ button, prompting the robot to reply with some text, that can reflect its likes/dislikes/personality
- UP006 - Users can kill their robot
- UP007 - If a robot dies, there is visual feedback. Dead robots cannot be interacted with
- UP008 - Users can create a new robot of their robot dies
- UP009 - Users cannot charge, teach, upgrade hardware or increase memory if they do not have the required currency

### Minigames
- MG001 - Users can play mini games in order to earn currency
- MG002 - Each mini game will have a description that teaches the user how to play the game

### Security Measures
- SE001 - A user cannot manipulate another user's robot
- SE002 - A user cannot manipulate another user's account details