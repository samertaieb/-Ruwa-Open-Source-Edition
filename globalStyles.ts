import { color } from "@rneui/base";
import { StyleSheet } from "react-native";
import { theme } from "./theme";

const mainColor = "#edae0b";

const globalStyles = StyleSheet.create({
  body: {
    backgroundColor: mainColor,
    flex: 1,
  },
});


const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#F4F4F4',  // Soft White
    shadowOpacity: 0,            // Removes the default shadow on iOS
    elevation: 0,       
  },
  headerTitleStyle: {
    color: '#4B7447',  
    fontSize: 22,
    fontWeight: 'bold',
  },
  subheader: {
    color: '#97D077',  
    fontSize: 18,
    fontWeight: '600',  // Semi-bold
    padding: 8,
    textAlign: 'center'
  },
  linkText: {
    marginTop: 8,
    textAlign: "right",
    color: "#97D077",  // Earth Green, ensures consistency in link color
    // textDecorationLine: 'underline',  // Adds underline to emphasize link
    fontWeight: 'bold',  // Optional: Adds emphasis to link text
    fontSize: 16,        // Sets an appropriate font size for links
  },
  welcomeImage:{
    marginTop:100,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headingProduct: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emptyContainerProduct: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    position: "relative",
  },

  addProductText: {
    color: "#4B7447", // Updated text color
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "500",
    paddingHorizontal: 20,
  },
  arrowProduct: {
    transform: [{ rotate: "59deg" }], // Adjust angle to point at "+" button
    marginBottom: 10,
  },
  menu: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    // color:"#97D077"
  },

  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B7447", // Use a color that contrasts well with the background
    marginBottom: 8,
    textTransform: "uppercase", // Optional: makes the header text all uppercase
    letterSpacing: 1, // Adds a bit of spacing between letters for emphasis
  },
    offer: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#66BB6A", // Use a color that contrasts well with the background
    marginBottom: 8,
    textTransform: "uppercase", // Optional: makes the header text all uppercase
    textDecorationLine:"line-through",

    letterSpacing: 1, // Adds a bit of spacing between letters for emphasis
  },
  counterOffer: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#66BB6A", // Use a color that contrasts well with the background
    marginBottom: 8,
    textTransform: "uppercase", // Optional: makes the header text all uppercase
    letterSpacing: 1, // Adds a bit of spacing between letters for emphasis
  },
  details: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#777",
  }, detailsHistory: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingBottom: 16,
    borderBottomWidth: 0,
    borderColor: "#777",
  },
  slectLanguageInputContainer: {
    marginTop:30,
    // width: "80%",
    marginBottom: 12,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: "#eeeeee",
    marginLeft: 10,
    marginRight:10,
    // borderColor:"black",
    marginTop: 8, // Adjust this value to control how far down the image is
    borderRadius: 8,
  },
  imageFace: {
    width: 120,
    height: 120,
    marginLeft: 1,
    marginRight:10,
    // borderColor:"black",
    marginTop: 8, // Adjust this value to control how far down the image is
    borderRadius: 8,
  },
  textCommon: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  orderName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color:"#4B7447"

  }, orderInfos: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    color:"#4B7447"

  },
  invoiceName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    margin: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderLeftWidth: 2.5,
  },
  
  noOffersText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B7447',
    marginBottom: 5,
    margin:10,
    textAlign:'center',
    alignItems: "center",
    justifyContent: "center",
  },
  relaxText: {
    fontSize: 14,
    color: '',
    margin:5,
    textAlign:'center',
    alignItems: "center",
  },
  imageHide: {
    width: 100,
    height: 100,
    backgroundColor: "#FFFFFF",
    marginLeft: 8,
  },
  NegociatnigImage: {
    width: 100,
    height: 100,
    // backgroundColor: "#e0e0e0",
    marginLeft: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonTextSecondary: {
    color: "#4B7447",
    fontSize: 18,
    fontWeight: "bold",
  },
  textDisabled: {
    color: "#C0C0C0",  // Updated to a more standard disabled text color for better visibility
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 18,
    backgroundColor: "#4B7447",  // Primary Green
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonSecondary: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 18,
    backgroundColor: "#97D077",  // Medium Light Green
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonPressed: {
    backgroundColor: "#3B7A57",  // Dark Green for primary button pressed state
  },
  buttonSecondaryPressed: {
    backgroundColor: "#89A064",  // Slightly darkened version of Medium Light Green for secondary pressed
  },
  buttonDisabled: {
    backgroundColor: "#DAF7A6",  // Light Green for primary button disabled state
    color: "#A9A9A9", // Grey text for disabled state (Ensure the text color is set in the text-specific style)
  },
  buttonSecondaryDisabled: {
    backgroundColor: "#B3CF96",  // A pale desaturated version of the Medium Light Green for secondary disabled
    color: "#C0C0C0", // Grey text for disabled state (Ensure the text color is set in the text-specific style)
  },

  alertContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  messageBody: {
    fontSize: 16,
    marginBottom: 12,
  },
});
export const updateAppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
  },
  contentContainer: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
    marginTop:100
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2596be", // Match your brand color
    textAlign: "center",
  },
  messageText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  button: {
    width: "80%",
    marginTop: 10,
  },
  progressContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  progressText: {
    marginTop: 10,
    fontSize: 14,
    color: "#2596be",
  },
});
const pickerSelectStyles = {
  inputIOS: {
    height: 45,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 14,
    color: "#000",
    textAlign: "center" as "center", // Specify as 'center'
    paddingRight: 25, // Ensure space for icon
  },
  inputAndroid: {
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 14,
    color: "#000",
    textAlign: "center" as "center", // Specify as 'center'
    paddingRight: 25, // Ensure space for icon
  },
  iconContainer: {
    top: 10,
    right: 10,
  },
  
};

const dropDownStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
    // width:'80%'
  },
  languageContainer:{width:'80%',
    marginBottom: 20,

  },
  inputContainer: {
    height: 60,
    borderRadius: 6,
    paddingHorizontal: 10,
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#f9f9f9",
    borderColor:"#D3D3D3"  
    

  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: "#666",
  },
  dropDownLabel: {
    marginBottom: 8,
    fontSize: 14,
    color: "#4B7447",
  },
  labelBlurred: {
    top: 20, // Adjust top position for blurred label
  },
  defaultBorder: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 12,
  },
});
const pickerSelectStylesDropDown = StyleSheet.create({
  inputIOS: {
    height: 50,
    color: "#000",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  inputAndroid: {
    height: 50,
    color: "#000",
    fontSize: 18,
    paddingHorizontal: 10,
    textAlign:"center"
  },
});

const dateInputStyles = StyleSheet.create({
  dateInputContainer: {
    marginBottom: 10,
    
  },
  dateInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateInputLabel: {
    marginBottom: 8,
    fontSize: 14,
    color: "#666",
  },
  dateInputPickerWrapper: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#f9f9f9",
  
  },
  dateInputErrorText: {
    color: "red",
    marginTop: 5,
  },
});
const tabsStyles = StyleSheet.create({
  tabsHeader: {
    flexDirection: "row",
  },
  tab: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  tabs: {
    flexGrow: 1,
    alignItems: "center",
  },
  selectedTab: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 50,
    borderColor: "#4B7447",  // Earth Green for the border color of the selected tab
  },
});

const productCardStyles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",

    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    borderRightWidth: 2.5,
  },
  content: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: "#eeeeee",
    marginLeft: 5,
    // marginRight:5,
    // borderColor:"black",
    marginTop: 8, // Adjust this value to control how far down the image is
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft:5,
    // alignItems: "right", // Align text to the right
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    color: "#4B7447",  // Earth Green for product names
  },
  info: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
    textAlign: "left",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "left",
    color:"#97D077"
  },
  category: {
    fontSize: 14,
    marginTop: 2,
    textAlign: "right",
  },
  linkText: {
    marginTop: 4,
    color: "#4B7447",
    textAlign: "right",
  },
  pendingMessage: {
    marginTop: 10,
    fontSize: 14,
    color: "#9ACD32",
    textAlign: "right",
  },
});
const radioButtonStyles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
  },
  checkedCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#444",
  },
  label: {
    marginLeft: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
});
const reusableButtonStyles = StyleSheet.create({
  actionButton: {
    color: "#007bff",
  },
});
const spinnerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: "#4B7447",
    textAlign:"center"
  },
});
const StringInputStyles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: "#666",
  },  
  stringInputLabel: {
    marginBottom: 8,
    fontSize: 14,
    color: "#4B7447",
  },
  disabledInput: {
    color: "grey",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f9f9f9",
    
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    textAlign:"center"

  },
  unit: {
    marginLeft: 8,
    fontSize: 18,
    color: "#666",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
});
const signUpStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
});
const changePasswordStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  formContainer: { padding: 24 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
const MicrocreditModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
const financialScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  balanceHeader: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  balanceText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4B7447",
  },
  requestButton: {
    marginTop: 20,
    width: "80%",
    paddingVertical: 12,
  },
  
});
const profileScreenStyles = StyleSheet.create({
  container: { flex: 1, },
  contentContainer: { padding: 24 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
const signInStyles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    // marginBottom: 12, // Adds space between the logo and the welcome text
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#4B7447",  // Changed to Earth Green
  },
  inputContainer: {
    width: "80%",
    marginBottom: 12,
  },
  slectLanguageInputContainer: {  // Note: 'slect' seems to be a typo, consider changing to 'select' if applicable
    marginTop: 30,
    width: "80%",
    marginBottom: 12,
  },
  button: {
    width: "80%",
    marginTop: 12,
  },
  linkContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  linkText: {
    fontSize: 16,
    color: "#4B7447",  // Changed to Earth Green to match the theme
  },
  joinUsText: {
    color: '#FC8C03',  // Keeping Sunset Orange for emphasis
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight:5,
    marginLeft:5
  },
});

export {
  globalStyles,
  mainColor,
  styles,
  pickerSelectStyles,
  dropDownStyles,
  pickerSelectStylesDropDown,
  dateInputStyles,
  tabsStyles,
  productCardStyles,
  radioButtonStyles,
  reusableButtonStyles,
  spinnerStyles,
  StringInputStyles,
  signUpStyles,
  changePasswordStyles,
  MicrocreditModalStyles,
  financialScreenStyles,
  profileScreenStyles,signInStyles
  
};
