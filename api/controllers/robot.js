const Robot = require("../models/robot");
const openai = require("../config/openaiConfig");

async function createRobot(req, res) {
    
    try{
        const { name, likes, dislikes, userId, personality } = req.body
        const robot = new Robot({
            name, likes, dislikes, userId, personality
        });
        changeRobotMood(robot, robot.batteryLife, robot.hardware)
        await robot.save()
        res.status(201).json({message: "Robot created"});

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Robot creation failed"});
    };
};

// async function getRobot(req, res) {
//     try{
//         const robotId = req.params.id
//         const singleRobot = await Robot.findById(robotId)
//         res.status(200).json({robot: singleRobot});

//     } catch (err) {
//         console.log(err);
//         res.status(404).json({message: "Failed to get robot"});
//     };
// };

async function getRobotByUserId(req, res) {
    try{
        const loggedInUser = req.params.id
        
        const singleRobot = await Robot.findOne({userId: loggedInUser})
        
        res.status(200).json({robot: singleRobot, message: "Fetched robot by user Id"});


    } catch (err) {
        console.log(err);
        res.status(404).json({message: "Failed to get robot"});
    };
};

async function updateRobotCurrency(req, res) {
    try{
        const robotId = req.params.id
        const newAmount = req.body.currency
        
        const singleRobot = await Robot.findById(robotId)

        if (!singleRobot.isAlive) return res.status(200).json({robot: singleRobot, message: "robot is dead"})
        newCurrency = singleRobot.currency += newAmount
        if(singleRobot.batteryLife === 100 && req.body.currency <0) {
            return res.status(200).json({ message: "Robot already fully charged" });
        }
        if(newCurrency < 0){
            res.status(200).json({ message:"Insufficient funds" });
        }
        else{
            singleRobot.currency = newCurrency
            await singleRobot.save();
            res.status(200).json({robot: singleRobot, message:"robot currency updated"});
        }
        

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to update robot currency"});
    };
};

async function updateRobotBattery(req, res) {
    
    try{
        const robotId = req.params.id
        const newBatteryLife = req.body.batteryLife
        const singleRobot = await Robot.findById(robotId)
        if (!singleRobot.isAlive) return res.status(200).json({robot: singleRobot, message: "robot is dead"})

        newBattery = singleRobot.batteryLife += newBatteryLife
        if(newBattery <=0){
            singleRobot.batteryLife = 0
            singleRobot.isAlive = false;
            singleRobot.image = "/deadRobot.png"
            await singleRobot.save();
        }
        else if(newBattery > 100){
            singleRobot.batteryLife = 100
            console.log("battery full")
            await changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
            await singleRobot.save();
        }
        else{
            singleRobot.batteryLife = newBattery
            await changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
            await singleRobot.save();
        }
        
        res.status(200).json({robot: singleRobot, message: "robot battery updated"});

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to update robot battery life"});
    };
};

async function updateRobotMemory(req, res) {
    try{
        const robotId = req.params.id
        const singleRobot = await Robot.findById(robotId)
        
        if (singleRobot.currency - 200 < 0) {
            return res.status(200).json({ message:"Insufficient funds" });
        }
        if (singleRobot.memoryCapacity * 2 > 4096) {
            return res.status(200).json({ message: "Memory at max" });
        }

        if (!singleRobot.isAlive) return res.status(200).json({robot: singleRobot, message: "robot is dead"})
        singleRobot.memoryCapacity = singleRobot.memoryCapacity * 2
        await changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
        singleRobot.currency = singleRobot.currency -= 200
        await singleRobot.save()
        res.status(200).json({robot: singleRobot, message: "Robot memory upgraded"});

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to update robot memory"});
    };
};


async function updateRobotIntelligence(req, res) {
    
    try{
        const robotId = req.params.id
        const brain = req.body.intelligence
        
        const singleRobot = await Robot.findById(robotId)

        if (singleRobot.currency - 30 < 0) {
            return res.status(200).json({ message:"Insufficient funds" });
        } else if (singleRobot.intelligence === singleRobot.memoryCapacity) {
            return res.status(200).json({ message: "Insufficient memory storage" });
        }
        
        if (!singleRobot.isAlive) return res.status(200).json({robot: singleRobot, message: "robot is dead"})
            
        const randomNumber = Math.floor(Math.random() * 10);
        singleRobot.currency = singleRobot.currency -=30
        
        if(randomNumber <=8){
            newIntelligence = singleRobot.intelligence += brain
            if(newIntelligence > singleRobot.memoryCapacity){
                
                singleRobot.intelligence = singleRobot.memoryCapacity
                await changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
                await singleRobot.save()
                return res.status(200).json({robot: singleRobot, message: "Robot intelligence increased"});
            }
            else{
                singleRobot.intelligence = newIntelligence
                await changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
                await singleRobot.save()
                return res.status(200).json({robot: singleRobot, message: "Robot intelligence increased"});
            }
        }
        else if(randomNumber > 8){
            return res.status(200).json({robot: singleRobot, message: "Robot intelligence did not increase"});
        }


    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to update robot intelligence"});
    };
};

async function updateRobotHardware(req, res) {

    try{
        const robotId = req.params.id
        const newHardwareAmount = req.body.hardwareChange
        
        const singleRobot = await Robot.findById(robotId)
        if (singleRobot.currency - 50 < 0) {
            return res.status(200).json({ message:"Insufficient funds" });
        } else if (singleRobot.hardware === 100) {
            return res.status(200).json({ message:"Already fully repaired" });
        }
        if (!singleRobot.isAlive) return res.status(200).json({robot: singleRobot, message: "robot is dead"})

        singleRobot.currency = singleRobot.currency -=50
        newHardware = singleRobot.hardware += newHardwareAmount
        

        if(newHardware <= 0){
            singleRobot.hardware = 0
            singleRobot.isAlive = false;
            singleRobot.image = "/deadRobot.png"
            await singleRobot.save();
        }
        else if (newHardware >100){
            singleRobot.hardware = 100
            await changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
            await singleRobot.save()
        }
        else{
            singleRobot.hardware = newHardware;
            await changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
            await singleRobot.save();
        }
        
        res.status(200).json({robot: singleRobot, message:"robot hardware updated"});

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to update robot hardware"});
    };
};

function updateRobotMood(robot, mood) {
    try{
        if(typeof mood === 'string'){
            robot.mood = mood

            if(mood === "Sad"){
                robot.image = "/Sadanim.gif"
            } else if (mood === "Happy"){
                robot.image = "/Happyanim.gif"
            } else if (mood === "Neutral"){
                robot.image = "/Neutralanim.gif"
            }
        } else {
            return "Mood must be a string!";
        }

        return robot;

    } catch (err) {
        console.log(err);
        return "Failed to update robot mood";
    };
};

async function killRobot(req, res){
    try{
        const robotId = req.params.id
        const singleRobot = await Robot.findById(robotId);

        singleRobot.isAlive = false;
        singleRobot.image = "/deadRobot.png"
        await singleRobot.save();
        
        res.status(200).json({robot: singleRobot, message: "killed robot"});
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to kill robot"});
    };
};

async function deleteRobot(req, res) {
    try{
        const robotId = req.params.id
        const singleRobot = await Robot.findById(robotId)
        
        if (singleRobot.isAlive === false){
            const deleteRobot = await Robot.findByIdAndDelete(robotId)
            if(deleteRobot){
                return res.status(200).json({message: "Robot deleted"});
            }
            else if (!deleteRobot) {
                return res.status(404).json({ message: 'Robot not found or already deleted' });
            }
        }
        else{
            return res.status(400).json({message: "Robot is not dead!"});
        }

        

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to delete robot"});
    };
};

async function changeStatsOnLogin(req, res) {
    const randomBattery = Math.floor(Math.random() * 10);
    const randomHardware = Math.floor(Math.random() * 10);
    try{
        const robotId = req.params.id
        const lastLogin = new Date(req.body.lastLogin);
        const currentDate = new Date(req.body.currentDate)
        const differenceInMilliseconds = currentDate.getTime() - lastLogin.getTime();
        const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
        const loggedOutDepletion = Math.floor(differenceInHours * 4)
        const singleRobot = await Robot.findById(robotId)
        if (!singleRobot.isAlive) return res.status(200).json({robot: singleRobot, message: "robot is dead"})
        if(randomBattery <=2){
            singleRobot.batteryLife -= 10 + loggedOutDepletion 
        }
        else if(randomBattery >2 && randomBattery <=6){
            singleRobot.batteryLife -= 5 + loggedOutDepletion
        }
        else if(randomBattery >6){
            singleRobot.batteryLife -= 2 + loggedOutDepletion
        }
        if(randomHardware <=2){
            singleRobot.hardware = singleRobot.hardware -= 15
        }
        else if(randomHardware >2 && randomHardware <=6){
            singleRobot.hardware = singleRobot.hardware -= 5
        }
        else if(randomHardware >6){
            singleRobot.hardware = singleRobot.hardware -= 2
        }
        if(loggedOutDepletion >= 24){
            singleRobot.currency += 100
        }

        const battery = singleRobot.batteryLife
        const hardware = singleRobot.hardware
        await changeRobotMood(singleRobot, battery, hardware)
        await singleRobot.save()
        return res.status(200).json({robot: singleRobot});

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to update robot stats"});
    };
};

async function lowerRobotBattery(req, res) {  
    try{
        const robotId = req.params.id
        const singleRobot = await Robot.findById(robotId)
        if (!singleRobot.isAlive) return res.status(200).json({robot: singleRobot, message: "robot is dead"})
        newBattery = singleRobot.batteryLife -= 5
        
        if(newBattery <=0){
            singleRobot.batteryLife = 0
            singleRobot.isAlive = false
            await singleRobot.save();
            return res.status(200).json({robot: singleRobot, message: "robot battery lowered"});
        }
        else {
            if(newBattery <=30 && singleRobot.hardware <50){
                singleRobot.batteryLife = newBattery
                changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
                await singleRobot.save()
                return res.status(200).json({robot: singleRobot, message: "robot battery lowered"});
            }
            else if(singleRobot.hardware >=50){
                if(newBattery >=70){
                    singleRobot.batteryLife = newBattery
                    changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
                    await singleRobot.save()
                    return res.status(200).json({robot: singleRobot, message: "robot battery lowered"});
                }
                else if(newBattery <70){
                    singleRobot.batteryLife = newBattery
                    changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
                    await singleRobot.save()
                    return res.status(200).json({robot: singleRobot, message: "robot battery lowered"});
                }
            }
            singleRobot.batteryLife = newBattery
            await changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
            await singleRobot.save();     
            return res.status(200).json({robot: singleRobot, message: "robot battery lowered"});
        }
        

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to lower robot battery life"});
    };
};

const changeRobotMood = async (robot, battery, hardware) => {
    if (!robot.isAlive) return
    if (battery <= 30) {
        await updateRobotMood(robot, "Sad");
    } else if(battery < 70) {
        if (hardware <= 30) {
            await updateRobotMood(robot, "Sad");
        } else if (hardware <= 70) {
            await updateRobotMood(robot, "Neutral");
        } else {
            await updateRobotMood(robot, "Happy");
        }
    } else {
        if (hardware <= 30) {
            await updateRobotMood(robot, "Sad");
        } else {
            await updateRobotMood(robot, "Happy");
        }
    }
}

const robotSpeach = async (req, res) => {
    const { id } = req.params
    try {
        const robot = await Robot.findById(id)
        const userInput = randomResponse(robot)
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {   
                    'role': 'system',
                    'content': [
                        {
                            'type': 'text',
                            'text':
                            `You are a virtual robot. You are speaking to your owner. Your name is ${robot.name}. Your personality is ${robot.personality}, and your mood is currently ${robot.mood}. When responding, always reflect your current mood and personality in your tone and style, but avoid directly stating it in your response. Limit your response up to 3 sentences.`
                        }
                    ]
                },
                {
                    'role': 'user',
                    'content': [
                        {
                            'type': 'text',
                            'text':userInput ? userInput : 'How are you doing?'
                        }
                    ]
                }
            ],
            max_tokens: 100
        })

        const textResponse = completion.choices[0].message.content

        if (robot.intelligence >= 1000 && !!textResponse) {
            const mp3 = await openai.audio.speech.create({
                model: 'tts-1',
                voice: 'fable',
                input: textResponse
            })
            // We get a readable stream from mp3 and here we convert it to a buffer and then encode to base64 so it can be sent in JSON
            const buffer = Buffer.from(await mp3.arrayBuffer())
            const audioBase64 = buffer.toString('base64')
            return res.status(200).json({
                message: textResponse,
                audio: `data:audio/mp3;base64,${audioBase64}`
            })
        }

        res.status(200).json({ message: completion.choices[0].message.content });

    } catch (err) {
        console.error(err)
        res.status(400).json({ message: 'I do not feel like talking right now' })
    }
}

const randomResponse = (robot) => {
    let userMessage;

    const batteryLow = robot.batteryLife <= 20;
    const hardwareLow = robot.hardware <= 20;

    if (batteryLow && hardwareLow) {
        userMessage = `Warning! You are in critical condition. Your battery is at ${robot.batteryLife}% and your hardware maintenance is at ${robot.hardware}%. You must act quickly! Can you respond urgently, pleading for help based on your personality?`
    }  else if (robot.batteryLife <= 20) {
        userMessage = `Critical warning: Your battery is dangerously low at ${robot.batteryLife}%. Please respond as if your very survival depends on it, reflecting your desperation based on your personality.`;
    } else if (robot.hardware <= 20) {
        userMessage = `Warning: Your hardware maintenance is at ${robot.hardware}%, far below safe levels! If you are not fixed soon, You might just have to take matters into your own hands. Can you respond with a threatening tone based on your personality?`
    } else {
        const quirkyChance = Math.random() < 0.2;
        if (quirkyChance) {
            userMessage = `Can you answer with a quirky response that makes sense related to your personality`
        } else {
            const randomChance = Math.random()
            if (randomChance < 0.5) {
                if (robot.likes.length !== 0) {
                    const randomLike = robot.likes[Math.floor(Math.random() * robot.likes.length)];
                    userMessage = `You express your opinion about something you like: "${randomLike}". You find this enjoyable because it aligns with your preferences and personality. Make sure you directly mention what you are talking about and your opinion on it.`;
                } else {
                    userMessage = `Can you answer with a quirky response that makes sense related to your personality`
                }
            } else {
                if (robot.dislikes.length !== 0) {
                    const randomDislike = robot.dislikes[Math.floor(Math.random() * robot.dislikes.length)];
                    userMessage = `You dislike the following: "${randomDislike}". Respond in the first person as if you are personally expressing this dislike. Start by clearly stating, "I dislike [thing] because..." or "I hate [thing] because...".  Then provide a specific and personal reason that reflects why it bothers you or disrupts your peace, considering your personality and current mood.`;
                } else {
                    userMessage =`Can you answer with a quirky response that makes sense related to your personality`
                }
            }
        }
    }
    return userMessage
}

async function updateLastLogin(req, res) {
    try{
        const robotId = req.params.id
        const dateToAdd = req.body.lastLogin
        const singleRobot = await Robot.findById(robotId)
        singleRobot.lastLogin = dateToAdd
        await singleRobot.save()
        return res.status(200).json({robot: singleRobot, message: "robot last login updated"});
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to update robot last login"});
    };
};

const RobotsController = {
    createRobot: createRobot,
    updateRobotCurrency: updateRobotCurrency,
    updateRobotBattery: updateRobotBattery,
    updateRobotMemory: updateRobotMemory,
    updateRobotIntelligence: updateRobotIntelligence,
    updateRobotHardware: updateRobotHardware,
    updateRobotMood: updateRobotMood,
    killRobot: killRobot,
    deleteRobot: deleteRobot,
    getRobotByUserId: getRobotByUserId,
    changeStatsOnLogin: changeStatsOnLogin,
    lowerRobotBattery: lowerRobotBattery,
    robotSpeach: robotSpeach,
    randomResponse: randomResponse,
    updateLastLogin: updateLastLogin
};

module.exports = RobotsController;