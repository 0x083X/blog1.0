# blog后台的前端页面  
技术栈: vue3 ts

技术点:
1. 使用redirect作为路由的中继，解决了点击相同路由页面不刷新的问题  

    - !!!**Error** 使用redirect会产生一些问题,如果想要使用keep-alive对相应的路由进行缓存会失效,因为点击router-link后会先跳转到redirect路由，再由redirect跳转到相应的路由中.  
        
        - 解决方法,判断路由是否需要redirect进行中继,如果需要keep-alive进行缓存则不需要它进行中继,如果需要它进行中继在加上它  

2. 使用vue3-md-editor作为md解析器  

3. 用suspense原生实现骨屏架  

4. 用js原生实现了添加tag的功能,支持enter键  

5. 用keep-alive对路由进行缓存  

缺点和前端页面相同  
1.做项目经验不够,代码耦合度太高，屎山代码。
    
