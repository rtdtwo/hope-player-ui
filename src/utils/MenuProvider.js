import HomeIcon from '../assets/home.svg';
import HomeActiveIcon from '../assets/home-active.svg';
import LikeIcon from '../assets/like.svg';
import LikeActiveIcon from '../assets/like-active.svg';
import ArtistIcon from '../assets/artist.svg';
import ArtistActiveIcon from '../assets/artist-active.svg';
import PlaylistIcon from '../assets/playlist.svg';
import PlaylistActiveIcon from '../assets/playlist-active.svg';
import SettingsIcon from '../assets/settings.svg';
import SettingsActiveIcon from '../assets/settings-active.svg';
import AboutIcon from '../assets/info.svg';
import AboutActiveIcon from '../assets/info-active.svg';

import HomePage from '../pages/Home'
import ArtistsPage from '../pages/Artists';
import AboutPage from '../pages/About';
import SettingsPage from '../pages/Settings';

export const PAGES = [
    {
        label: 'Home',
        index: 0,
        icon: HomeIcon,
        iconActive: HomeActiveIcon,
        page: <HomePage />
    },
    {
        label: 'Liked',
        index: 1,
        icon: LikeIcon,
        iconActive: LikeActiveIcon,
        page: null
    },
    {
        label: 'Artists',
        index: 2,
        icon: ArtistIcon,
        iconActive: ArtistActiveIcon,
        page: <ArtistsPage />
    },
    {
        label: 'Playlists',
        index: 3,
        icon: PlaylistIcon,
        iconActive: PlaylistActiveIcon,
        page: null
    },
    {
        label: 'Settings',
        index: 4,
        icon: SettingsIcon,
        iconActive: SettingsActiveIcon,
        page: <SettingsPage />
    },
    {
        label: 'About',
        index: 5,
        icon: AboutIcon,
        iconActive: AboutActiveIcon,
        page: <AboutPage />
    }
]