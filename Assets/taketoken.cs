using UnityEngine;
using System.Collections;

public class taketoken : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	void OnTriggerEnter(){
		GameObject guiinterface = GameObject.Find("Main Camera");
		guiinterface.SendMessage("taketagtoken");
		GameObject.Destroy(gameObject);
	}
}
