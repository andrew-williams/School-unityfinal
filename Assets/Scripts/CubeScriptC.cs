using UnityEngine;
using System.Collections;

public class CubeScriptC : MonoBehaviour {
	public bool isLocal = false;

	void Update () {
		transform.Rotate( Vector3.up*90*Time.deltaTime, ( isLocal ? Space.Self : Space.World ) );
	}
}
