var app = new Vue({
    el:'#app',
    data:{
        title:'旅遊資訊網',
        data:[],
        currentPage:0,
        type:"全部",
    },

    mounted() {
        // axios.get('https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json')
        axios.get("https://api.kcg.gov.tw/api/service/Get/9c8e1450-e833-499c-8320-29b36b7ace5c")
        .then(res => {
            // this.data = res.data.result.records
            this.data = res.data.data.XML_Head.Infos.Info
        })
        .catch(err => {
            console.error(err); 
        })
    },


    computed:{

        filtersData(){

            let items = []

            if(this.type == '全部'){
                items = this.data
            }else{
                items = this.data.filter((item, i)=>{
                    console.log(item)
                    return item.Zipcode == this.type
                })
            }


            const newData=[]

            items.forEach((data , i) => {
                if (i % 10 ===0){
                    newData.push([])
                }

                const page = parseInt(i / 10)
                newData[page].push(data)
            })
            console.log(newData)

            return newData
        },

    },

    methods: {

        targetInfo: function(i,item) {
            console.log(i)
            console.log(item.Name)
        }

    },

})