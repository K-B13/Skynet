import Phaser from 'phaser';
import Level from './scenes/Level.js';
import Preload from './scenes/Preload.js';
import CoinCollect from './scenes/CoinCollect.js';

export const createGame = (containerId, onGameOver) => {
	const game = new Phaser.Game({
	width: 1280,
	height: 720,
	type: Phaser.AUTO,
	backgroundColor: '#242424',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	physics: {
		default: 'arcade',
		arcade: {
		gravity: { y: 98 },
		},
	},
	parent: containerId,
	});


	game.scene.add('Preload', Preload);
	game.scene.add('CoinCollect', new CoinCollect(onGameOver));
	game.scene.add('Level', Level);
	game.scene.add('Boot', Boot, true);
	
	

    game.scene.start('CoinCollect');


	return game; 
};

class Boot extends Phaser.Scene {
	preload() {
	this.load.pack('pack', 'assets/preload-asset-pack.json');
	}

	create() {
	console.log('Boot scene created');
	this.scene.start('Preload');
	}
}
