// ** React Imports
import { createContext, useState, useContext } from 'react'

// ** ThemeConfig Import
import themeConfig from 'src/configs/themeConfig'

const initialSettings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth
}

// ** Create Settings Context
export const SettingsContext = createContext({
  saveSettings: () => null,
  settings: initialSettings
})

// ** Create Profile Context
export const ProfileContext = createContext({
  profile: null,
  setProfile: () => null
})

export const SettingsProvider = ({ children }) => {
  // ** State
  const [settings, setSettings] = useState({ ...initialSettings })
  const [profile, setProfile] = useState(null)

  const saveSettings = updatedSettings => {
    setSettings(updatedSettings)
  }

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      <ProfileContext.Provider value={{ profile, setProfile }}>
        {children}
      </ProfileContext.Provider>
    </SettingsContext.Provider>
  )
}

export const SettingsConsumer = SettingsContext.Consumer
export const ProfileConsumer = ProfileContext.Consumer

export const useSettings = () => useContext(SettingsContext)
export const useProfile = () => useContext(ProfileContext)
