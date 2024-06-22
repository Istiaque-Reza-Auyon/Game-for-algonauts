import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private ground!: Phaser.Physics.Arcade.StaticGroup;
    private blackhole1!: Phaser.Physics.Arcade.StaticGroup;
    private blackhole2!: Phaser.Physics.Arcade.StaticGroup;
    private spaceCraft!: Phaser.Physics.Arcade.StaticGroup;
    private explosion!: Phaser.Physics.Arcade.Sprite;


    constructor() {
        super('game-scene');
    }

    preload() {
        // Load assets here
        this.load.image('sky', 'assets/scifi wallpaper.png');
        this.load.spritesheet('dude', 'assets/astro.webp', { frameWidth: 42, frameHeight: 48 });
        this.load.spritesheet('blackhole', 'assets/fire.png', {frameWidth: 15, frameHeight: 24});
        this.load.image('spaceCraft', 'assets/spaceship.png');
        this.load.spritesheet('explosion', 'assets/busted1.png', { frameWidth: 127.5, frameHeight: 128 });
    }

    create() {
        this.ground = this.physics.add.staticGroup();
        this.ground.create(0, 0, 'sky').setOrigin(0, 0).setScale(1).refreshBody();

        this.blackhole1 = this.physics.add.staticGroup();
        let blackhole1Sprite = this.blackhole1.create(50, 200, 'blackhole').setOrigin(0, 0).setScale(1).refreshBody();

        this.blackhole2 = this.physics.add.staticGroup();
        let blackhole2Sprite = this.blackhole2.create(300, 398, 'blackhole', 0).setOrigin(0, 0).setScale(1).refreshBody();


        this.spaceCraft = this.physics.add.staticGroup();
        this.spaceCraft.create(300, 300, 'spaceCraft').setOrigin(0, 0).setScale(1).refreshBody();


        this.player = this.physics.add.sprite(50, 398, 'dude');
        this.player.setCircle(this.player.body.halfWidth, 0, this.player.body.halfHeight - this.player.body.halfWidth)
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.blackhole1, function (this: GameScene, player, blackhole) {
            const playerSprite = player as Phaser.Physics.Arcade.Sprite;
            const blackhole2Sprite = blackhole as Phaser.Physics.Arcade.Sprite
            playerSprite.destroy();
            blackhole2Sprite.destroy();
            this.explosion = this.physics.add.sprite(playerSprite.x, playerSprite.y, 'explosion');
            this.explosion.play('explode');
        }, undefined, this);
        this.physics.add.collider(this.player, this.blackhole2, function (this: GameScene, player, blackhole) {
            const playerSprite = player as Phaser.Physics.Arcade.Sprite;
            const blackhole2Sprite = blackhole as Phaser.Physics.Arcade.Sprite
            playerSprite.destroy();
            blackhole2Sprite.destroy();
            this.explosion = this.physics.add.sprite(playerSprite.x, playerSprite.y, 'explosion');
            this.explosion.play('explode');
        }, undefined, this);

        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 1 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 11 }),
            frameRate: 1,
            hideOnComplete: true
        });

        let currentFrame = 0;
        this.time.addEvent({
            delay: 100,
            callback: () => {
                currentFrame = currentFrame < 5 ? (currentFrame + 1) : 0;
                blackhole1Sprite.setFrame(currentFrame);
            },
            loop: true
        });

        this.time.addEvent({
            delay: 100,
            callback: () => {
                currentFrame = currentFrame < 5 ? (currentFrame + 1) : 0;
                blackhole2Sprite.setFrame(currentFrame);
            },
            loop: true
        });
    }

    update() {
        
    }

    movePlayer(direction: string) {
        const moveSpeed = 100;

        switch (direction.toLowerCase()) {
            case 'move':
                const targetAngle = this.player.rotation;
                let vx = Math.cos(targetAngle) * moveSpeed;
                let vy = Math.sin(targetAngle) * moveSpeed;
                this.player.setVelocity(vx, vy);
                this.player.play('move');
                setTimeout(() => {
                    this.player.setVelocity(0, 0);
                    this.player.anims.play('turn');
                }, 1000);
                break;
            case 'turn':
                const currentAngle = this.player.angle
                this.tweens.add({
                    targets: this.player,
                    angle: currentAngle < 0 ? Math.floor(currentAngle + 90) : Math.ceil(currentAngle + 90),
                    duration: 800,
                    ease: 'Linear'
                });
                break;
        }
    }
}

// class Explosion extends Phaser.Physics.Arcade.Sprite{
//     constructor(scene: Phaser.Scene,x: number,y: number, texture: string){
//     super(scene,x,y,texture = 'explosive');
//     scene.add.existing(this);
//     this.play('explode');
//     }
// }