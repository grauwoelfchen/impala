import { App, LogLevel } from '@slack/bolt';
import { View } from '@slack/types';

// TODO: create config file
const command = '/' + (process.env.SLACK_COMMAND || 'hello')
    , title = 'Rooibok'
    , note = process.env.SLACK_COMMAND_MODAL_NOTE ||
        'Hi, I\'m Rooibok! I help to create a GitHub issue.'
    , pTitle = 'e.g. How the Rooibok works?'
    , pDescription = 'e.g. I\'d just like to know...'
    ;

const view: View = {
  type: 'modal'
, callback_id: 'post'
, title: {
    type: 'plain_text'
  , text: title
  }
, blocks: [{
    type: 'section'
  , text: {
      type: 'plain_text'
    , text: note
    }
  }, {
    type: 'input'
  , element: {
      type: 'plain_text_input'
    , action_id: 'title'
    , placeholder: {
        type: 'plain_text'
      , text: pTitle
      }
    }
  , label: {
      type: 'plain_text'
    , text: 'Title'
    }
  , hint: {
      type: 'plain_text'
    , text: 'plaintext'
    }
  }, {
    type: 'input'
  , element: {
      type: 'plain_text_input'
    , action_id: 'description'
    , multiline: true
    , placeholder: {
        type: 'plain_text'
      , text: pDescription
      }
    }
  , label: {
      type: 'plain_text'
    , text: 'Description'
    }
  , hint: {
      type: 'plain_text'
    , text: 'markdown'
    }
  }]
, submit: {
    type: 'plain_text'
  , text: 'Submit'
  , emoji: true
  }
, close: {
    type: 'plain_text'
  , text: 'Cancel'
  , emoji: true
  }
};

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET
, token: process.env.SLACK_BOT_TOKEN
, logLevel: LogLevel.DEBUG
});

app.message('hello', ({ message, say }) => {
  say({
    text: ''
  , blocks: [{
      type: 'section'
    , text: {
        type: 'mrkdwn'
      , text: `Hi there <@${message.user}>!`
      }
    }]
  });
});

app.event('app_home_opened', ({ event, say }) => {
  say(`Hello world, and welcome <@${event.user}>!`);
});

app.command(command, ({ ack, context, payload }) => {
  ack();

  try {
    const result = app.client.views.open({
      token: context.botToken
    , trigger_id: payload.trigger_id
    , view
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

app.view('view_submission', ({ ack, body, context }) => {
  ack();

  try {
    console.log(body);
    console.log(context);
  } catch (error) {
    console.error(error);
  }
});

app.error((error) => {
  console.error(error);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('server is running');
})();
