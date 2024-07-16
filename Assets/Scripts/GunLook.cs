using UnityEngine;
using System.Collections;

public class GunLook : MonoBehaviour {
	public Camera sourceCam;
	public Vector3 lookTarget;
	
	void Update () {
		Ray ray = sourceCam.ScreenPointToRay(Input.mousePosition);
		RaycastHit hit;
		if( Physics.Raycast(ray, out hit) ){
			lookTarget = hit.point;
			transform.LookAt(lookTarget);
		}
	}
}
