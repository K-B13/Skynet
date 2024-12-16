export default class CoinCollect extends Phaser.Scene {

	constructor(onGameOver) {
		super("CoinCollect");
		this.onGameOver = onGameOver;
		this.gameOver = false;
	}

	/** @returns {void} */
	editorCreate() {

		// right_key
		const right_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		// left_key
		const left_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

		// guapen
		const guapen = this.add.image(63, 634, "guapen");
		guapen.scaleX = 0.5;
		guapen.scaleY = 0.5;

		// guapen_1
		const guapen_1 = this.add.image(278, 634, "guapen");
		guapen_1.scaleX = 0.5;
		guapen_1.scaleY = 0.5;

		// guapen_2
		const guapen_2 = this.add.image(473, 637, "guapen");
		guapen_2.scaleX = 0.5;
		guapen_2.scaleY = 0.5;

		// guapen_3
		const guapen_3 = this.add.image(655, 634, "guapen");
		guapen_3.scaleX = 0.5;
		guapen_3.scaleY = 0.5;

		// guapen_4
		const guapen_4 = this.add.image(831, 637, "guapen");
		guapen_4.scaleX = 0.5;
		guapen_4.scaleY = 0.5;

		// guapen_5
		const guapen_5 = this.add.image(1009, 642, "guapen");
		guapen_5.scaleX = 0.5;
		guapen_5.scaleY = 0.5;

		// guapen_6
		const guapen_6 = this.add.image(1188, 637, "guapen");
		guapen_6.scaleX = 0.5;
		guapen_6.scaleY = 0.5;

		// coinBackground
		const coinBackground = this.add.image(641, 365, "CoinBackground");
		coinBackground.scaleX = 0.7;
		coinBackground.scaleY = 0.7;

		// bolt
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
		const bolt = this.add.image(509, 241, "bolt");
		bolt.scaleX = 0.2;
		bolt.scaleY = 0.2;
		bolt.angle = 20;
		this.physics.add.existing(bolt, false);
		bolt.body.setSize(500, 500, false);

		// happyMood
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
		const happyMood = this.add.image(577, 658, "happyMood");
		happyMood.scaleX = 0.3;
		happyMood.scaleY = 0.3;
		this.physics.add.existing(happyMood, false);
		happyMood.body.moves = false;
		happyMood.body.setSize(500, 500, false);

		// score_word
		const score_word = this.add.text(1096, 9, "", {});
		score_word.text = "Score:";
		score_word.setStyle({ "color": "#000", "fontSize": "30px" });

		// score
		const score = this.add.text(1214, 12, "", {});
		score.text = "0";
		score.setStyle({ "color": "#000", "fontSize": "30px" });

		// collider
		const collider = this.physics.add.overlap(happyMood, bolt, this.collide);

		this.guapen = guapen;
		this.guapen_1 = guapen_1;
		this.guapen_2 = guapen_2;
		this.guapen_3 = guapen_3;
		this.guapen_4 = guapen_4;
		this.guapen_5 = guapen_5;
		this.guapen_6 = guapen_6;
		this.bolt = bolt;
		this.happyMood = happyMood;
		this.score_word = score_word;
		this.score = score;
		this.right_key = right_key;
		this.left_key = left_key;
		this.collider = collider;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	guapen;
	/** @type {Phaser.GameObjects.Image} */
	guapen_1;
	/** @type {Phaser.GameObjects.Image} */
	guapen_2;
	/** @type {Phaser.GameObjects.Image} */
	guapen_3;
	/** @type {Phaser.GameObjects.Image} */
	guapen_4;
	/** @type {Phaser.GameObjects.Image} */
	guapen_5;
	/** @type {Phaser.GameObjects.Image} */
	guapen_6;
	/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
	bolt;
	/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
	happyMood;
	/** @type {Phaser.GameObjects.Text} */
	score_word;
	/** @type {Phaser.GameObjects.Text} */
	score;
	/** @type {Phaser.Input.Keyboard.Key} */
	right_key;
	/** @type {Phaser.Input.Keyboard.Key} */
	left_key;
	/** @type {Phaser.Physics.Arcade.Collider} */
	collider;

	create() {
		this.editorCreate();

		this.events.on('game-over', (finalScore) => {
			
			if (typeof this.onGameOver === 'function') {
				this.onGameOver(finalScore); 
			} else {
				console.log('onGameOver callback not found'); 
			}
		});

		this.bolt.body.setVelocityY(this.boltSpeed);

		const guapens = [this.guapen, this.guapen_1, this.guapen_2, this.guapen_3, this.guapen_4, this.guapen_5, this.guapen_6]
		const positions = []
		guapens.forEach(b => {
    	positions.push({x: b.x, y: b.y})
		})

		const first_position = positions[0]

        this.happyMood.x = first_position.x
        this.happyMood.y = first_position.y

		const random_index = Phaser.Math.Between(0, 6)
        const random_position = positions[random_index]

		this.bolt.x = first_position.x
        this.bolt.y = 0,0

		this.boltSpeed = 100; 
		this.speedIncrement = 10;



		let current_position_index = 0

        this.right_key.on('down', () => {
            current_position_index = current_position_index + 1
            if(current_position_index > positions.length - 1){
                current_position_index = 0
            }

            const new_happyMood_position = positions[current_position_index]
            this.happyMood.x = new_happyMood_position.x
            this.happyMood.y = new_happyMood_position.y

        })

		this.left_key.on('down', () => {
            current_position_index = current_position_index - 1
            if(current_position_index > positions.length - 1){
                current_position_index = 0
            }
            const new_happyMood_position = positions[current_position_index]
            this.happyMood.x = new_happyMood_position.x
            this.happyMood.y = new_happyMood_position.y

        })
		this.positions = positions

		 this.gameOverText = this.add.text(640, 360, "Game Over!", {
        fontSize: "64px",
        color: "#ff0000",
        fontStyle: "bold",
        align: "center"
    }).setOrigin(0.5); 
    this.gameOverText.setVisible(false); 
}

update() {
    if (this.bolt.y > this.scale.height && !this.gameOver) { 
        this.triggerGameOver();
    }
}

// Game Over logic
triggerGameOver() {
	if(this.gameOver) return;
	this.gameOver = true;
    
    this.gameOverText.setVisible(true);

    // Stop the game mechanics
    this.physics.pause(); 
    this.left_key.enabled = false;
    this.right_key.enabled = false;

	const finalScore = Number(this.score.text);
	localStorage.setItem('finalScore', finalScore);
	console.log('Emitting game-over event with score:', finalScore); 
	this.events.emit('game-over', finalScore);
	}

	
collide = (a, b) => {
        this.score.text = Number(this.score.text) + 1
		const maxSpeed = 1000; 
		this.boltSpeed = Math.min(this.boltSpeed + this.speedIncrement, maxSpeed);	
        const random_index = Phaser.Math.Between(0, 6)
        const random_position = this.positions[random_index]
        b.x = random_position.x
        b.y = 0
		b.body.setVelocityY(this.boltSpeed);
    }
}
