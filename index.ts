import config from './config';
import app from './app';

app.listen(config.port, () => {
    console.log(`Admin-Node API on port ${config.port}`);
});
