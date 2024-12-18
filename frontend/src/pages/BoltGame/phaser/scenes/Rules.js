
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Rules extends Phaser.Scene {

	constructor() {
		super("Rules");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// rectangle_1
		const rectangle_1 = this.add.rectangle(631, 385, 128, 128);
		rectangle_1.scaleX = 10.843245119073705;
		rectangle_1.scaleY = 6.590886094560823;
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 1213331;

		// text_1
		const text_1 = this.add.text(484, 102, "", {});
		text_1.text = "Rules";
		text_1.setStyle({ "align": "center", "fontSize": "100px" });

		// text_2
		const text_2 = this.add.text(150, 240, "", {});
		text_2.scaleX = 0.8102511475886586;
		text_2.text = "For every bolt you catch you will gain 1 coin to spend on your robot.";
		text_2.setStyle({ "fontSize": "30px" });

		// text
		const text = this.add.text(149, 327, "", {});
		text.scaleX = 0.8102511475886586;
		text.text = "Use the left and right arrow keys on your keyboard to move.";
		text.setStyle({ "fontSize": "30px" });

		// text_3
		const text_3 = this.add.text(148, 409, "", {});
		text_3.scaleX = 0.8102511475886586;
		text_3.text = "The more bolts you catch the faster they will fall. Good Luck!";
		text_3.setStyle({ "fontSize": "30px" });

		// rectangle_2
		const rectangle_2 = this.add.rectangle(605, 556, 128, 128);
		rectangle_2.scaleX = 2.1407254926075714;
		rectangle_2.scaleY = 0.6608656221758529;
		rectangle_2.isFilled = true;
		rectangle_2.fillColor = 2543156;

		// text_4
		const text_4 = this.add.text(525, 531, "", {});
		text_4.text = "Start";
		text_4.setStyle({ "align": "center", "color": "#000", "fontSize": "50px" });

		// happyMood
		const happyMood = this.add.image(845, 149, "happyMood");
		happyMood.scaleX = 0.2;
		happyMood.scaleY = 0.2;

		// happyMood_1
		const happyMood_1 = this.add.image(406, 153, "happyMood");
		happyMood_1.scaleX = 0.2;
		happyMood_1.scaleY = 0.2;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
