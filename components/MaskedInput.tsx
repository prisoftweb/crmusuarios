import InputMask from 'react-input-mask';
const MaskedInput = (props:any) => {
    return (
            <InputMask 
                mask='(+52) 999 999 9999' 
                maskChar={null} 
                value={props.value} 
                onChange={props.onChange}
                placeholder='Enter your PIN'>
            </InputMask>        
    )
}

export default MaskedInput;