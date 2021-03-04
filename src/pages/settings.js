import React from 'react';

import { editAccess } from '../config.json';
import ExportLibrary from '../components/settings/ExportLibrary';
import ImportLibrary from '../components/settings/ImportLibrary';
import DefaultSort from '../components/settings/DefaultSort';
import AudioQuality from '../components/settings/AudioQuality';

const Settings = (props) => {
    return (
        <div className="m-4">
            <AudioQuality />

            <DefaultSort />

            <ExportLibrary />
            
            { editAccess ? <ImportLibrary /> : '' }
        </div>
    )
}

export default Settings;