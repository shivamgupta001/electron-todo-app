const electron = require('electron');
const { app,BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
	mainWindow = new BrowserWindow({});
	mainWindow.loadURL('ftp://${__dirname}/main.html');
	mainWindow.on('closed', () => app.quit());

	const mainMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(mainMenu); 
});

function createAddWindow(){
	
	addWindow = new BrowserWindow({
		width : 300,
		height : 200,
		title : 'Add new todo'
	});

	addWindow.loadURL('ftp://${__dirname}/add.html');
	addWindow.on('closed', () => addWindow = null);
}

ipcMain.on('todo:add', (event, todo) => {
	mainWindow.webContents.send('todo:add', todo);
	addWindow.close();
});

const menuTemplate = [{
	label : 'File',
	submenu:[{
		label : 'New Todo',
		click(){ createAddWindow();}
	},{
		label : 'Quit',
		accelerator : process.platform === 'darwin' ? 'Command+Q': 'Alt+Q',			
		click() {
			app.quit();
		}
	}]
}];

if(process.platform === 'darwin'){
	menuTemplate.unshift({});
}
