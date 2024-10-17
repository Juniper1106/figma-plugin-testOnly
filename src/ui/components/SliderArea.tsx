import { NetworkMessages } from "@common/network/messages";

import { useState } from "react";
import "@ui/components/SliderArea.scss"
import { Slider, Flex } from "antd";

function SliderArea() {
    const [disabled, setDisabled] = useState(false);

    return (
    <div className="sliderContainer">
        <Slider defaultValue={30} disabled={disabled} />
        <Slider 
            defaultValue={30} 
            disabled={disabled} 
            onChangeComplete={
                (value: number) => {
                    NetworkMessages.GET_VIEW_RANGE.send({range: value});
                }
            }
        />
    </div>
    );
}

export default SliderArea;