import React, { Component } from 'react';
import Editable from "./Editable"


class editProfile extends React.Component {

    render() { 

        const [task, setTask] = useState(" ");

        return ( 
            <Editable
                text={task}
                placeholder="sampletext"
                type="input"
            >
                <input
                    type="text"
                    name="task"
                    placeholder="sampletext"
                    value={task}
                    onChange={e => setTask(e.target.value)}
                />
            </Editable>
        );
    }
}
 
export default editProfile;
