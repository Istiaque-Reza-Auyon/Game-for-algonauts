import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
    private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private ground: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super('game-scene');
    }

    preload() {
        // Load assets here
        this.load.image('sky', 'assets/sky.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.ground = this.physics.add.staticGroup();
        this.ground.create(300, 200, 'sky').setScale(4).refreshBody(); // Adjust scale as needed

        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.physics.add.collider(this.player, this.ground); // Enable collision between player and ground

        // this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // this.cursors = this.input.keyboard.createCursorKeys();

    //     const gameSceneInstance = this;
    // console.log(gameSceneInstance);

    }

    update() {
        // Update game logic here
        // if (this.cursors.left.isDown) {
        //     this.player.setVelocityX(-160);

        //     this.player.anims.play('left', true);
        // }
        // else if (this.cursors.right.isDown) {
        //     this.player.setVelocityX(160);

        //     this.player.anims.play('right', true);
        // }
        // else if (this.cursors.up.isDown) {
        //     this.player.setVelocityY(-160);

        //     this.player.anims.play('up', true);
        // }
        // else if (this.cursors.down.isDown) {
        //     this.player.setVelocityY(160);

        //     this.player.anims.play('down', true);
        // }
        // else {
        //     this.player.setVelocityX(0);
        //     this.player.setVelocityY(0);

        //     this.player.anims.play('turn');
        // }

        // if (this.cursors.up.isDown && this.player.body.touching.down)
        // {
        //     this.player.setVelocityY(-330);
        // }


    }

    movePlayer(direction: string) {
        const moveSpeed = 160; // Adjust the move speed as needed

        switch (direction.toLowerCase()) {
            case 'left':
                this.player.setVelocityX(-moveSpeed);
                this.player.anims.play('left', true);
                break;
            case 'right':
                this.player.setVelocityX(moveSpeed);
                this.player.anims.play('right', true);
                break;
            case 'up':
                this.player.setVelocityY(-moveSpeed);
                this.player.anims.play('up', true);
                break;
            case 'down':
                this.player.setVelocityY(moveSpeed);
                this.player.anims.play('down', true);
                break;
            case 'stop':
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
                this.player.anims.play('turn');
                break;
            default:
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
                this.player.anims.play('turn');
                break;
        }
    }
}