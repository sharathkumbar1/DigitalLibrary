import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const styles = (theme) => ({
});

const AudioBook = () => (
    <AudioPlayer
        // src="http://devsharedstellentcontentsivr.target.com/target-com/flashvoicefiles/english/test1.mp3"
        src="http://samarthanamcloudservices-env.eba-qe6ed46a.ap-south-1.elasticbeanstalk.com/downloadAudio?file=file_example_MP3_700KB.mp3"
        onPlay={e => console.log("onPlay")}
        progressJumpStep="10000" // 10 seconds
        autoPlayAfterSrcChange={false}
        defaultCurrentTime="00:00"
        defaultDuration="loading..."
        customAdditionalControls={[]}
    />
);

export default withStyles(styles)(AudioBook);
