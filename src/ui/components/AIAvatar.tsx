import { useState } from "react";
import { Badge, message } from "antd";
import "./AIAvatar.scss"
import avatarImg from "@ui/assets/img/avatar.png"
 
function AIAvatar() {
    const [AIStatus, setAIStatus] = useState<{
        status: "processing" | "success" | "error",
        text: string,
        nextAction: string
    }>({
        status: "error",
        text: "AI's current action",
        nextAction: "AI's next action"
    });

    
    return (
    <div className="avatarContainer">
        <img className="avatar" src={avatarImg} alt="" />
        <Badge status={AIStatus.status} text={AIStatus.text} />
        <Badge status="default" text={AIStatus.nextAction} />
    </div>
    );
}

export default AIAvatar;