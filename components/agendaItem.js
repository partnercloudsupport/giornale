import React from 'react';
import { Animated, Dimensions, Easing, Image, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BorderlessButton, LongPressGestureHandler, RectButton, State, Swipeable, TapGestureHandler } from 'react-native-gesture-handler';

const window = Dimensions.get('window');

export class AgendaItem extends React.Component {
	constructor(props){
		super(props);

		this.state = {
		    pressed: false,
		    animatedImageValue: new Animated.Value(0),
			
		};
	}
	componentDidMount() {

	}
	componentWillUnmount() {

	}
	componentWillMount() {
        console.log(this.props.item);
    }

	renderLeftActions(progress, dragX){

			const trans = dragX.interpolate({
			  inputRange: [0, 50],
			  outputRange: [-20, 0],
			});
			return (
			  <RectButton>
			    <Animated.Text
			      style={
			        {
			          transform: [{ translateX: trans }],
			        }
			      }>
			      Archive
			    </Animated.Text>
			  </RectButton>
			);

	}


	handleImageAnimation(){
        Animated.timing(this.state.animatedImageValue, {
            toValue: this.state.pressed ? 0 : 1,
            duration: 200,
            easing: Easing.ease,
        }).start()
        

		this.setState({
			pressed: !this.state.pressed
		})
    }
    handleMusicPlay(){
    	console.log("play music")
    }

	render() {
		let d = new Date(this.props.item.date)
      	let day = ("0" + d.getDate()).slice(-2);
      	let month = ("0" + (d.getMonth() + 1)).slice(-2);

		return (
			
				<View style={styles.item}>

					
				<View style={styles.date}>
					<Text allowFontScaling={false} style={styles.day}>{day}</Text>
					<Text allowFontScaling={false} style={styles.month}>{month}</Text>
				</View>
				
				<View style={styles.textContainer}>
				
				<TouchableOpacity onPress={this.handleMusicPlay.bind(this)}>
					<Text allowFontScaling={false} style={styles.title}>{this.props.item.title}</Text>
					<Text allowFontScaling={false} style={styles.artist}>{this.props.item.artist}</Text>
				</TouchableOpacity>	
				
				
				</View>

				<TouchableOpacity onPress={this.handleImageAnimation.bind(this)}>   
				<Animated.Image
					style={[
						styles.image,
						{
                        'height': this.state.animatedImageValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [70, 200]
                        }),
                        'width': this.state.animatedImageValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [70, 200]
                        })
                    	}
					]}
					source={{uri: this.props.item.albumImage}}
					resizeMode={'cover'}
				/>
                </TouchableOpacity>

			</View>
			
		)
	}
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  	backgroundColor: '#FFF',
  	marginTop: 10,
  	marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 0,
  	borderRadius: 15,
  	elevation: 3
  },
  image:{
    width: 70,
    height: 70,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 8,
  },
  textContainer:{
  	flex: 1,
  	justifyContent: 'center',
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#002642'
  },
  title:{
  	fontFamily: "Roboto-Bold",
  	fontSize: 16,
    textAlign: 'left',
  },
  artist:{
  	fontFamily: "Roboto-Regular",
  	fontSize: 16,
    textAlign: 'left',
    flexWrap: 'wrap',
    color: '#aaa',
  },
  album:{
  	fontFamily: "Roboto-Regular",
  	fontSize: 16,
    textAlign: 'right',
  },
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  day: {
    fontSize: 16,
    fontFamily: "Roboto-Bold",
    color: '#000',
  },
  month: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: '#aaa',
  },

});