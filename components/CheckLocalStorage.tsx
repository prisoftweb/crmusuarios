const CheckLocalStorage = () => {
    return (
        <div>            
        </div>
    )
}
//export const UserLocalStorage = (():void => void  {
export const UserLocalStorage = (d:number) =>  {
    // Local Storage
  let user;
    if (typeof window !== 'undefined') {
    user = localStorage.getItem('user');
  } else {
    return null;
  }
  return 1;
};

export default CheckLocalStorage;