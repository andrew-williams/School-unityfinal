using UnityEngine;
using System.Collections;

public class RaycastHealth : MonoBehaviour {
	HealthManager _hm;
	
	// Use this for initialization
	void Start () {
		_hm = GameObject.Find("ControlCenter").GetComponent<HealthManager>();
	}
	
	// Update is called once per frame
	void Update () {
		RaycastHit[] hits;
		hits = Physics.RaycastAll(transform.position, transform.forward, 10.0f);
		for ( int i = 0; i < hits.Length; i++) {
			RaycastHit hit = hits[i];
			if ( hit.collider.gameObject.tag == "HealthBox" ) {
				Color transC = new Color( 0.2f, 1.0f, 0.2f, 0.3f );  
				Renderer renderer = hit.collider.renderer;
				renderer.material.shader = Shader.Find("Transparent/Diffuse");
				hit.collider.gameObject.tag = "Untagged";
                renderer.material.color = transC;
				_hm.health = Mathf.Clamp( _hm.health+25, 0, 100 );
			}
		}
	}
}
