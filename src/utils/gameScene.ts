import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private ground!: Phaser.Physics.Arcade.StaticGroup;
    private blackhole1!: Phaser.Physics.Arcade.StaticGroup;
    private blackhole2!: Phaser.Physics.Arcade.StaticGroup;
    private moon!: Phaser.Physics.Arcade.StaticGroup;


    constructor() {
        super('game-scene');
    }

    preload() {
        // Load assets here
        this.load.image('sky', 'assets/bg.jpg');
        this.load.spritesheet('dude', 'assets/astro.webp', { frameWidth: 42, frameHeight: 48 });
        this.load.image('blackhole1', 'assets/blackhole1.png');
        this.load.image('moon', 'assets/spacecraft.png');
    }

    create() {
        this.ground = this.physics.add.staticGroup();
        this.ground.create(0, 0, 'sky').setOrigin(0, 0).setScale(1).refreshBody(); 

        this.blackhole1 = this.physics.add.staticGroup();
        this.blackhole1.create(0, 200, 'blackhole1').setOrigin(0, 0);

        this.blackhole2 = this.physics.add.staticGroup();
        this.blackhole2.create(300, 348, 'blackhole1').setOrigin(0, 0);

        this.moon = this.physics.add.staticGroup();
        this.moon.create(300, 200, 'moon').setOrigin(0, 0);

        this.player = this.physics.add.sprite(50, 398, 'dude');
        this.physics.add.collider(this.player, this.ground); 
        this.physics.add.collider(this.player, this.blackhole1);
        // this.physics.add.collider(this.player, this.blackhole2);

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
    }

    update() {
        
    }

    movePlayer(direction: string) {
        const moveSpeed = 100; 

        switch (direction.toLowerCase()) {
            case 'move':
                const targetAngle = this.player.rotation;
                let vx = Math.cos(targetAngle) * moveSpeed;
                let vy = Math.sin(targetAngle)* moveSpeed;
                this.player.setVelocity(vx, vy);
                this.player.play('move');
                setTimeout(() => {
                    this.player.setVelocity(0,0);
                    this.player.anims.play('turn');
                }, 1000);
                break;
            case 'turn':
                const currentAngle = this.player.angle 
                this.tweens.add({
                    targets: this.player,
                    angle: currentAngle<0 ? Math.floor(currentAngle+90) : Math.ceil(currentAngle + 90),
                    duration: 800, 
                    ease: 'Linear'
                });
                break;
        }
    }
}