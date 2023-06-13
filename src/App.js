import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import PreMeetingTasks from './page/preMeetingTasks';
import MobileTest from './page/MobileTest';
import TaskBeforeMeet from './page/taskBeforeMeet';
import TemplateEdit from './page/templateEdit';
import AuthTaskBeforeMeet from './page/authTaskBeforeMeet';

function App() {
  return (
    <div className="App">
      <TaskBeforeMeet/>
      {/* <AuthTaskBeforeMeet /> */}
      {/* <TemplateEdit/> */}
      {/* <PreMeetingTasks /> */}
      {/* <MobileTest /> */}
    </div>
  );
}

export default App;
