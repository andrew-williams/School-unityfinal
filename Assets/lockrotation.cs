using UnityEngine;
using System.Collections;

public class lockrotation : MonoBehaviour {
	//public Quaternion lockRotation;
	// Use this for initialization
	void Start () {
		//lockRotation = Quaternion.identity;
		//lockRotation.eulerAngles = new Vector3(90,0,0);
	}
	
	// Update is called once per frame
	void Update () {
		//transform.rotation = lockRotation.eulerAngles.x;
		transform.rotation = Quaternion.Euler(90, 0, 0);
	}
}
