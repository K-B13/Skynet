# Testing Skynet Beta Functional Specification

## Summary
- Testing the current application against its specification
- ✅ = pass ❌ = fail
- Will update periodically as the application progresses
- Last updated 5pm Wednesday 18th Dec
- Current results = 68 ✅ 5 ❌
- 47 cases covered with automated tests

### Accounts and authentication
- AA001 - Users can sign up with username and password. There is visual feedback for doing so. ✅(automated)
- AA002 - Inputted passwords are hidden by default, but can be revealed to the user with a ‘show’ button ✅(automated)
- AA003 - Users cannot sign up with invalid email. Emails must:
	- have a valid format ✅(automated)
	- not exceed 255 characters ✅(automated)
	- not have a local part of their email longer than 64 characters ✅(automated)
- AA004 - Users cannot sign up with a password that: 
	- is shorter than 8 characters ✅(automated)
	- longer than 20 characters ✅(automated)
	- does not include a number ✅(automated)
	- does not include a special character ✅(automated)
	- does not include a mix of uppercase and lowercase letters ✅(automated)
- AA005 - Signed up users can log in if they provide the correct credentials ✅(automated)
- AA006 - There is clear visual feedback if the user inputs invalid registration/login details ✅(automated)
- AA007 - Logged in users can log out ✅(automated)
- AA008 - Users can delete their account ❌
- AA009 - Users can easily navigate between sign up and log in screens ✅(automated)

### Robot Creation and Display
- RB001 - Users cannot create a robot without being signed up and logged in. ✅ (still testing API)
- RB002 - Users must name their robot in the robot creation screen. ✅(automated) There is a maximum robot name length ✅ (but not on API)
- RB003 - Users must choose one personality for their robot. The default is ‘helpful’, but they can also choose ‘playful’, ‘wise’ or ‘fiery’ ✅(automated)
- RB004 - Users can add to a list of up to 5 ‘likes’ and ‘dislikes’ for their robot. ✅(automated) These impact the robot’s personality. ✅ Likes/dislikes are written by the user themself ✅ and they have a maximum length ✅ (but not on API)
- RB005 - After creating a robot, users can see their robot and its attributes on the home screen ✅(automated)
- RB006 - If a user logs in and they have not created a robot yet, they will be prompted to create one. ✅(automated) Otherwise, they will be guided to the home screen, where they can see their robot and its attributes ✅(automated)
- RB007- The following attributes are visible on the home screen:
	- Name ✅(automated)
	- Battery ✅(automated)
	- Memory ✅(automated)
	- Intelligence ✅(automated)
	- Hardware ✅(automated)
	- Mood ✅(automated)
	- Currency ✅(automated)

### Robot Attributes
- RA001 - Battery starts at 100% ✅(automated) and can only be 0-100% ✅(automated)
- RA002 - Battery depletes by 5% for every 30 minutes of in-game usage ✅
- RA003 - Robot dies if battery reaches 0% ✅(automated)
- RA004 - Memory starts at 16GB ✅(automated) and can only be
16-4096GB ✅(automated)
- RA005 - Intelligence starts at 0 ✅(automated) and can only be 0-4096 ✅(automated)
- RA006 - Intelligence can never be higher than memory ✅(automated)
- RA007 - Hardware starts at 100% ✅(automated) and can only be 0-100% ✅(automated)
- RA008 - Robot dies if hardware reaches 0% ✅(automated)
- RA009 - Robot mood starts at ‘Happy’ ✅(automated) but can also be ‘Neutral’ or ‘Sad’ ✅
- RA010 - Robot mood changes based on battery and hardware attributes:
	- The robot's mood is set to 'Sad' if either battery or hardware is 30 or lower. ✅
	- The robot's mood is 'Neutral' if both battery and hardware are between 31 and 69. ✅
	- The robot's mood is 'Happy' if: both hardware and battery are above 70, or if one attribute (either battery or hardware) is at least 70, and the other attribute is at least 31. ✅
- RA011 - Hardware will randomly deplete by either 2, 5 or 15 upon logging in ✅
- RA012 - Battery will randomly deplete by either 2, 5 or - 10 upon logging in ✅
- RA013 - Currency starts at 500 for a newly-created robot. ✅(automated) There is currently no maximum amount of currency (could be implemented later)
- RA014 - The user will gain 100 currency for only the first login of every calendar day ❌ (currently every login)

### Upgrades and Actions
- UP001 - Users can charge their robot, either by 10% or up to full charge. ✅(automated) When charging by full, each 1% of battery charged costs 1 currency ✅ (currently if you do +10 with 91+% battery, you get charged a flat 10 fee)
- UP002 - Users can upgrade their robot’s hardware in 50% increments. ✅ This will cost 50 currency per upgrade ✅
- UP003 - Users can double their robot’s memory by spending 200 currency ✅(automated)
- UP004 - Users can try to teach their robot by spending 30 currency. ✅(automated) This will give them a 90% chance of increasing their robot’s intelligence by 5 ✅
- UP005 - Users can press the ‘speak’ button, prompting the robot to reply with some text, that can reflect its likes/dislikes/personality ✅
- UP006 - Users can kill their robot ✅(automated)
- UP007 - If a robot dies, there is visual feedback. Dead robots cannot be interacted with ✅(automated)
- UP008 - Users can create a new robot of their robot dies ✅(automated)
- UP009 - Users cannot charge, teach, upgrade hardware or increase memory if they do not have the required currency ✅(automated)

### Speak
- SP001 - Robots with < 100 intelligence have basic responses ✅
- SP002 - Robots with 100-999 intelligence have AI generated responses ✅
- SP003 - Robots with >= 1000 intelligence have AI generated responses with text to speech ✅

### Minigames
- MG001 - Users can play mini games in order to earn currency ✅
- MG002 - Each mini game will have a description that teaches the user how to play the game ✅ (BWAM is nearly there)
- MG003 - There is clear visual feedback to alert the user that they have earned X coins from a mini game ✅ (apart from virus sweeper)

### Security Measures
- SE001 - A user cannot manipulate another user's robot ❌
- SE002 - A user cannot manipulate another user's account details ✅
- SE003 - Users cannot gain any advantage by using the API instead of the frontend (pending testing)
- SE004 - A user cannot access the create robot page if they already have an alive robot ❌
- SE005 - A user who is not logged in cannot access any pages other than splash, sign up and login ❌

## Results

68 ✅ 5 ❌