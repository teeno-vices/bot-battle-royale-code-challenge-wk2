
import styles from './styles/botCollection.module.css'

export default function YourBotArmy({ botArmy, onRemoveBot }) {
    const emojis = {
        "Support": "🚚",
        "Defender": "🛡️",
        "Assault": "🔫",
        "Medic": "🩺",
        "Captain": "👨‍✈️",
        "Witch": "🚀"
    }
    return <div className={styles.army}>
        <div className={styles.heading}>
            <img src='/images/bot.army.png'/>
            <h3>Bot Ultimatum Army</h3>
        </div>
        <div className={styles.armyCont}>
            {
                botArmy.map((bot, i) => {
                    return <div className={`${styles.bot}  ${styles.botBlue}`} key={i}>
                        <img onClick={() => onRemoveBot(bot.id)} className={styles.botImage} src={bot.avatar_url} alt={bot.name} />
                        <div className={styles.name}>
                            <div className={styles.botName}>{bot.name} {emojis[bot.bot_class]}</div>
                        </div>
                        <div className={styles.catchPhrase}>{bot.catchphrase}</div>
                    </div>
                })
            }
        </div>
        {
            botArmy.length ? null :
                <h3 className={styles.placeholder}
                >{`CREATE YOUR BOT ARMY HERE`}</h3>
        }
    </div>
}