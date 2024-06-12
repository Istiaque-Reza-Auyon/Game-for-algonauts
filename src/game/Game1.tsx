import React, { useEffect, useRef } from 'react';
import { GameScene } from '../utils/gameScene.ts';
import Phaser from 'phaser';

interface GameProps {
    setGameScene: (gameScene: GameScene) => void;
}

const Game: React.FC<GameProps> = ({ setGameScene }) => {
    const gameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 600,
            height: 400,
            scene: [GameScene],
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
            parent: 'game-container', // Ensure the parent is set
        };

        const game = new Phaser.Game(config);
        gameRef.current = game;
        
        game.events.on('ready', () => {
            const gameSceneInstance = game.scene.getScene('game-scene') as GameScene;
            setGameScene(gameSceneInstance);
        });
        
        return () => {
            game.destroy(true);
        };
    }, []);

    return <div id="game-container" className="ml-96 pb-96" />;
};

export default Game;
