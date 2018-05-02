import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container,Header,Item,Input,Text, Button, Icon, Content, Card, CardItem, Thumbnail, Body, Left, Right} from 'native-base';
import axios from 'axios';

class App extends Component {

  constructor(){
    super()
    this.state = {isi_data: [], search : ""}
  }

  get = () => {
    var url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.search}`;

    var config = {
      headers:{'user-key':'7b11a0f731eed717ec3392606104d6ec'}
    };

    axios.get(url, config)
    .then((ambilData)=>{
      this.setState({data: ambilData.data.restaurants})
      
    })
  }

    render () {

      const data = this.state.data.map((x,index) => {

        var nama = x.restaurant.name;
        var kota = x.restaurant.location.city;
        var alamat = x.restaurant.location.address;
        var harga = (x.restaurant.average_cost_for_two/2);
        var gambar = x.restaurant.thumb;


        return(
                <Card key = {index} style = {{flex: 0}}>

                  <CardItem>
                    <Left>
                      <Thumbnail source={{uri: gambar}} />
                      <Body>
                        <Text>{nama}</Text>
                        <Text note>{kota}</Text>
                      </Body>
                    </Left>

                    <Right>
                      <Text>{harga}</Text>
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Body>
                      <Image source = {{uri: gambar}} style = {{height: 200, width : 350, flex: 0}} />
                    </Body>
                  </CardItem>

                  <CardItem>
                    <Left>
                      <Icon name = "thumbs-up" />
                      <Text>{alamat}</Text>
                    </Left>
                  </CardItem>

                </Card>
        )
      })

        return (
            <Container>

              <Header searchBar rounded>
                <Item>
                  <Icon name = "search" />
                  <Input placeholder = "Cari nama makanan" onChangeText={(x)=> {this.setState({search: x})}} value={this.state.form}/>
                </Item>
              </Header>

              <Header>
                <Button block onPress={()=> {this.get()}}>
                  <Text> daftar restaurant </Text>
                </Button>
              </Header>

              <Content>
                {data}
              </Content>
            </Container>
        )
    }
}

export default App;