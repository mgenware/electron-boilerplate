import * as path from 'path';
import { app, Menu, shell } from 'electron';
import {
  is,
  appMenu,
  aboutMenuItem,
  openUrlMenuItem,
  openNewGitHubIssue,
  debugInfo,
} from 'electron-util';

const showPreferences = () => {
  // Show the app's preferences here
};

const helpSubmenu = [
  openUrlMenuItem({
    label: 'Website',
    url: 'https://github.com/sindresorhus/electron-boilerplate',
  }),
  openUrlMenuItem({
    label: 'Source Code',
    url: 'https://github.com/sindresorhus/electron-boilerplate',
  }),
  {
    label: 'Report an Issue…',
    click() {
      const body = `
<!-- Please succinctly describe your issue and steps to reproduce it. -->


---

${debugInfo()}`;

      openNewGitHubIssue({
        user: 'sindresorhus',
        repo: 'electron-boilerplate',
        body,
      });
    },
  },
];

if (!is.macos) {
  helpSubmenu.push(
    {
      type: 'separator',
    },
    aboutMenuItem({
      icon: path.join(__dirname, 'static', 'icon.png'),
      text: 'Created by Your Name',
    }),
  );
}

const debugSubmenu = [
  {
    label: 'Show App Data',
    click() {
      shell.openPath(app.getPath('userData'));
    },
  },
  {
    type: 'separator',
  },
  {
    label: 'Delete App Data',
    click() {
      shell.moveItemToTrash(app.getPath('userData'));
      app.relaunch();
      app.quit();
    },
  },
];

const macosTemplate = [
  appMenu([
    {
      label: 'Preferences…',
      accelerator: 'Command+,',
      click() {
        showPreferences();
      },
    },
  ]),
  {
    role: 'fileMenu',
    submenu: [
      {
        label: 'Custom',
      },
      {
        type: 'separator',
      },
      {
        role: 'close',
      },
    ],
  },
  {
    role: 'editMenu',
  },
  {
    role: 'viewMenu',
  },
  {
    role: 'windowMenu',
  },
  {
    role: 'help',
    submenu: helpSubmenu,
  },
];

// Linux and Windows
const otherTemplate = [
  {
    role: 'fileMenu',
    submenu: [
      {
        label: 'Custom',
      },
      {
        type: 'separator',
      },
      {
        label: 'Settings',
        accelerator: 'Control+,',
        click() {
          showPreferences();
        },
      },
      {
        type: 'separator',
      },
      {
        role: 'quit',
      },
    ],
  },
  {
    role: 'editMenu',
  },
  {
    role: 'viewMenu',
  },
  {
    role: 'help',
    submenu: helpSubmenu,
  },
];

const template = process.platform === 'darwin' ? macosTemplate : otherTemplate;

if (is.development) {
  template.push({
    label: 'Debug',
    submenu: debugSubmenu,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default Menu.buildFromTemplate(template as any);
