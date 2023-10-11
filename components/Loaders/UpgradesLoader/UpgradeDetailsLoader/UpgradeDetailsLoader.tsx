import styles from './UpgradeDetailsLoader.module.css'

export default function UpgradeDetailsLoader() {
  return (
    <>
      <div className={ styles.container }>
        <div className={ styles.upgradeContainer }>
          <div className={ styles.title } />
        </div>
        <div className={ styles.upgradesRequired_Container } />
        <div className={ styles.upgradeTime_Container } />
        <div className={ styles.upgradeCosts_Container } />
      </div>
    </>
  )
}
