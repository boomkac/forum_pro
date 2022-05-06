<template>
  <div class="center clearfix">
        <div class="header">
            <div>
                <span>Welcome to SCForum</span>
            </div>
        </div>
        <div class="middle clearfix">
            <div class="show_img">
                <img src="../assets/R-C.jpg">
            </div>
            <div class="enter">
                <div class="title_sc">
                    <span>SC论坛</span>
                </div>
                <div class="send_point">
                    <span>马上发表您的观点</span>
                </div>
                <div class="enter_link">
                    <router-link to="/main">
                        &nbsp;&nbsp;进入主页&nbsp;&nbsp;
                    </router-link>
                </div>
                <div class="send_point_small">
                    <span>马上发表您的观点</span>
                </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script>
export default {
    name: 'IndexPage',

}
</script>

<style>


/*主体*/
/**************************************/
.center{
    width: 100%;
    margin: 0 0;
}


.header{
    /* border: 1px solid red; */
    margin-top: 100px;
    width: 80%;
    margin: 100px auto auto;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 90px;
    font-family: "宋体","微软雅黑","黑体","楷体","幼圆","Lucida Calligraphy", cursive, serif, sans-serif;
    font-weight: bold;
}

.middle{
    width: 80%;
    /* border: 1px solid red; */
    margin: 40px  auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 100px;
    /* min-width: 960px; */
}

.show_img{
    /* border: 1px solid red; */
    width: 55%;
}

.show_img>img{
    width: 100%;
}

.enter{
    /* border: 1px solid red; */
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.title_sc{
    width: 100%;
    text-align: center;
    font-size: 70px;
    font-family: 微软雅黑;
    font-weight: 900;
    margin-bottom: 50px;
}

.title_sc>div{
    flex-grow: 1;
}

.send_point{
    margin-bottom: 50px;
    text-align: center;
}

.send_point>span{
    font-family: "宋体",微软雅黑;
    font-size: 40px;
    font-weight: 900;
}

.enter_link>a{
    font-size: 30px;
    background-image: linear-gradient(10deg,rgb(244,244,244),rgb(120,220,200));
    border: 1px solid rgb(120,200,180);
    border-radius: 20px;
    color: black;
    text-decoration: none;
    box-shadow: 5px 10px 50px 5px rgb(120,200,180);
}

.enter_link>a:hover{
    background-image: linear-gradient(white,rgb(120,220,200));
    
}

.send_point_small{
    margin-top: 80px;
    display: none;
    text-align: center;
}

.send_point_small>span{
    font-family: "宋体",微软雅黑;
    font-size: 40px;
    font-weight: 900;
}


@media screen and (max-width:960px) and (min-width:720px) {

    /**/
    .middle{
        flex-direction: column;
        margin-top: 50px;
    }
    .show_img{
        width: 80%;
    }
    .enter{
        width: 80%;
        margin-top: 50px;
    }
    .send_point{
        display: none;
    }
    .send_point_small{
        display: block;
    }
}

@media screen and (max-width:720px) {
    
     /**/
     .header{
         margin-top: 72px;
     }
     .header div{
         line-height: 50px;
     }
     .header span{
         font-weight: bolder;
         font-size: 50px;
     }
     .middle{
        flex-direction: column;
        margin-top: 50px;
    }
    .show_img{
        width: 80%;
    }
    .enter{
        width: 80%;
        margin-top: 50px;
    }
    .send_point{
        display: none;
    }
    .send_point_small{
        display: block;
        margin-top: 40px;
    }
}

</style>