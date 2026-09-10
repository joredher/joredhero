import { createContext, useContext, useMemo, useState } from 'react';
import { personalityProfiles } from '../data/personalityProfiles.js';

const ProfilePanelContext = createContext(null);

export function ProfilePanelProvider({ children }) {
  const [openId, setOpenId] = useState(null);

  const value = useMemo(() => {
    function step(delta) {
      const index = personalityProfiles.findIndex(profile => profile.id === openId);
      const nextIndex = (index + delta + personalityProfiles.length) % personalityProfiles.length;
      setOpenId(personalityProfiles[nextIndex].id);
    }
    return {
      openId,
      isOpen: openId !== null,
      open: setOpenId,
      close: () => setOpenId(null),
      next: () => step(1),
      previous: () => step(-1),
    };
  }, [openId]);

  return <ProfilePanelContext.Provider value={value}>{children}</ProfilePanelContext.Provider>;
}

export function useProfilePanel() {
  return useContext(ProfilePanelContext);
}
