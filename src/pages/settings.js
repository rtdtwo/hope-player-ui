import React from 'react';
import { editAccess } from '../config.json';
import AudioQuality from '../components/settings/AudioQuality';
import DefaultSort from '../components/settings/DefaultSort';
import ExportLibrary from '../components/settings/ExportLibrary';
import ImportLibrary from '../components/settings/ImportLibrary';


const Settings = () => {
    return (
        <div className="page-root settings-container">
            <h3 className="page-headline mb-0 lm-40 tm-40 rm-40 bottom-border">Settings</h3>
            <div className="settings-list-container">
                <AudioQuality />

                <DefaultSort />

                <ExportLibrary />

                {editAccess ? <ImportLibrary /> : ''}
            </div>
        </div>
    );
}

export default Settings;