//import React, { Component } from 'react';
// import { Card, CardContent, Paper } from '@material-ui/core';
import { GoMail } from 'react-icons/go';
import { Link } from 'react-router-dom';
// import Sidebar from '../Sidebar/Sidebar';
// import './Messages.css';

// class Messages extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <div className="flexHomeScreen">
//         <div className="sideBarWidths">
//           <Sidebar />
//         </div>
//         <Card className="cardWidth">
//           <Paper className="paperHeight">
//             <div className="flexMessagesIcon">
//               Messages
//               <Link to="/home">
//                 <div className="messageIcon">
//                   <GoMail size={25} />
//                 </div>
//               </Link>
//             </div>
//           </Paper>
//
//         </Card>
//       </div>
//     );
//   }
// }

// export default Messages;

import React, { Component } from 'react';
import { Card, Paper } from '@material-ui/core';
import MessageCard from '../MessageCard/MessageCard';
import Sidebar from '../Sidebar/Sidebar';
import './Messages.css';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="flexHomeScreen">
        <div className="sideBarWidths">
          <Sidebar />
        </div>
        <Card className="cardWidth1">
          <Paper className="paperHeight">
            Messages
            <Link to="/home">
              <div className="messageIcon">
                <GoMail size={25} />
              </div>
            </Link>
          </Paper>
          <div className="messageCardStyling">
            <MessageCard />
          </div>
        </Card>
      </div>
    );
  }
}

export default Messages;
