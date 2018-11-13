import Toast from 'react-native-root-toast';


export function toastTool(message, duration = Toast.durations.LONG) {
    Toast.show(message||'', {
        duration: duration, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        shadow: true, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0, // toast显示的延时
        textStyle: {fontSize:13},
        onShow: () => {
            // toast出现回调（动画开始时）
        },
        onShown: () => {
            // toast出现回调（动画结束时）
        },
        onHide: () => {
            // toast隐藏回调（动画开始时）
        },
        onHidden: () => {
            // toast隐藏回调（动画结束时）
        }
    });
}

export function confirmAlert(dialog, title, confirmTitle, confirmAction, cancelTitle, cancelAction) {
    var options={
        thide:true, /*不显示头部标题*/
        messText:title || '',
        clickScreen:true,
        innersHeight: 130,
        messTextStyle:{color:'#fff'},
        dialogBgColor:'rgba(0,0,0,0.4)',
        buttons:[
            {
                txt: cancelTitle || '',
                btnStyle:{
                    backgroundColor:'#cccccc',
                },
                onpress:()=>{
                    cancelAction && cancelAction()
                }
            },
            {
                txt: confirmTitle || '',
                onpress:()=>{
                    confirmAction && confirmAction()
                }
            }
        ]
    }
    dialog && dialog.show(options);
}