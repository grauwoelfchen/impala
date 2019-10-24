import { App } from '@slack/bolt';

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET
, token:         process.env.SLACK_BOT_TOKEN
});

app.event('app_home_opened', ({ event, say }) => {
  console.log(event.channel);
  say(`Hello world, and welcome <@${event.user}>!`);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('server is running');
})();
