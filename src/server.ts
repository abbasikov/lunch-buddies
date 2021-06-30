import App from './app';
import MeetingsController from './meetings/meetings.controller';

const app = new App([new MeetingsController()], 3000);

app.listen();
