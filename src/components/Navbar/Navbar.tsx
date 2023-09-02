import styles from "./Navbar.module.css"
import { Space, Button } from "antd";
import { HomeOutlined, LoginOutlined, LogoutOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { isUserLoggedin } from "../../utils/utils";

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className={styles.Header}
      >
        <div className={styles.MenuContainer}>
          <div>
            <Space size={30}>
              <p className={styles.MenuItems} onClick={() => navigate('/home')}><HomeOutlined /> Home</p>
              <p className={styles.MenuItems}>About</p>
            </Space>
          </div>
          <div>
            <Space size={30}>
              <Button type={"primary"} onClick={() => navigate('/upload')}><UploadOutlined /> Upload</Button>
              {!isUserLoggedin() ?
                <Button type={"primary"} onClick={() => navigate('/login')}><LoginOutlined />Login</Button> :
                <Button type={"primary"} onClick={() => {
                  localStorage.clear()
                  navigate('/login')
                }} ><LogoutOutlined />Logout</Button>
              }
            </Space>

          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
