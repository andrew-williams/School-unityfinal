using UnityEngine;
using System.Collections;

public class BoxRotate : MonoBehaviour {
	public float speed = 45;
	
	bool doRotate = false;

	void OnMouseEnter () {
		//doRotate = true;
		StartCoroutine("RotateBox");
	}
	
	void OnMouseExit () {
		//doRotate = false;
		StopCoroutine("RotateBox");
	}

	/* void Update () {
		if ( doRotate ) {
			transform.Rotate(0,speed*Time.deltaTime,0);
		}
	} */
	
	IEnumerator RotateBox () {
		while (true) {
            transform.Rotate(0,speed*Time.deltaTime,0);
            yield return null;
        }
    }
}
